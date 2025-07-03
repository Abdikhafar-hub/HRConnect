from db import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from datetime import datetime

STANDARD_COMMISSION_PERCENTAGE = 10.0  # App commission as standard

# Country-to-payment mapping for dynamic withdrawals
PAYMENT_GATEWAYS = {
    "KE": ["M-Pesa"],
    "NG": ["Paystack", "Flutterwave"],
    "GH": ["MTN Money", "Paystack"],
    "UG": ["Airtel Money", "MTN Money"],
    # Extend as needed
}

class WorkerWallet(db.Model, SerializerMixin):
    __tablename__ = 'worker_wallets'
    serialize_rules = ('-worker.wallet', '-transactions.wallet',)

    id = Column(Integer, primary_key=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False, unique=True)
    balance = Column(Float, default=0.0)
    currency = Column(String(10), default='KES')  # or dynamic per user
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # relationship
    worker = db.relationship('Worker', backref='wallet', uselist=False)
    transactions = db.relationship('WorkerWalletTransaction', backref='wallet', cascade="all, delete-orphan")

    def pending_balance(self):
        return sum(t.amount for t in self.transactions if t.status == 'pending' and t.type == 'credit')

    def get_available_payment_methods(self):
        country = getattr(self.worker, 'country_code', 'KE')  # fallback to Kenya
        return PAYMENT_GATEWAYS.get(country, [])

    def initiate_withdrawal(self, amount, method, description="Withdrawal"):
        if amount > self.balance:
            raise ValueError("Insufficient wallet balance for withdrawal.")

        transaction = WorkerWalletTransaction(
            wallet_id=self.id,
            amount=amount,
            type='debit',
            method=method,
            description=description,
            status='pending'  # to be updated after payment gateway response
        )

        self.balance -= amount  # optimistic deduction
        db.session.add(transaction)
        db.session.commit()
        return transaction

    def __repr__(self):
        return f"<Wallet for Worker {self.worker_id} - Balance: {self.balance} {self.currency}>"


class WorkerWalletTransaction(db.Model, SerializerMixin):
    __tablename__ = 'worker_wallet_transactions'
    serialize_rules = ('-wallet.transactions',)

    id = Column(Integer, primary_key=True)
    wallet_id = Column(Integer, ForeignKey('worker_wallets.id'), nullable=False)
    amount = Column(Float, nullable=False)
    type = Column(String(20), nullable=False)  # 'credit' or 'debit'
    method = Column(String(50))  # e.g., 'M-Pesa', 'Paystack'
    status = Column(String(20), default='pending')  # pending, completed, failed
    reference = Column(String(100))  # transaction ID from payment gateway
    description = Column(String(255))
    commission_percentage = Column(Float, default=STANDARD_COMMISSION_PERCENTAGE)
    commission_amount = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=datetime.utcnow)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if self.type == 'credit' and self.commission_percentage:
            self.commission_amount = round((self.amount * self.commission_percentage) / 100, 2)

    def net_amount(self):
        return self.amount - self.commission_amount if self.type == 'credit' else self.amount

    def __repr__(self):
        return f"<Transaction {self.type} {self.amount} {self.status} via {self.method} (Commission: {self.commission_amount})>"
