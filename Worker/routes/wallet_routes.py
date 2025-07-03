from flask_restful import Resource, reqparse
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from Worker.model.wallet.wallet import WorkerWallet
from Worker.model.wallet.wallet import WorkerWalletTransaction
from Worker.model.wallet.wallet import WorkerWalletTransaction as WithdrawalRequest
from db import db

# Parsers
withdrawal_parser = reqparse.RequestParser()
withdrawal_parser.add_argument('amount', type=float, required=True, help='Amount is required')
withdrawal_parser.add_argument('channel', type=str, required=True, help='Withdrawal channel is required')
withdrawal_parser.add_argument('destination', type=str, required=True, help='Destination is required')

class WalletBalanceResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        wallet = WorkerWallet.query.filter_by(worker_id=worker_id).first()
        if not wallet:
            return jsonify({'balance': 0.0, 'pending_balance': 0.0})
        return jsonify({
            'balance': wallet.balance,
            'pending_balance': wallet.pending_balance()
        })

class WalletTransactionListResource(Resource):
    @jwt_required()
    def get(self):
        worker_id = get_jwt_identity()
        transactions = WorkerWalletTransaction.query.filter_by(wallet_id=WorkerWallet.query.filter_by(worker_id=worker_id).first().id).order_by(WorkerWalletTransaction.timestamp.desc()).all()
        return jsonify([t.to_dict() for t in transactions])

class WalletWithdrawalRequestResource(Resource):
    @jwt_required()
    def post(self):
        args = withdrawal_parser.parse_args()
        worker_id = get_jwt_identity()
        wallet = WorkerWallet.query.filter_by(worker_id=worker_id).first()
        if not wallet or args['amount'] > wallet.balance:
            return jsonify({'error': 'Insufficient balance'}), 400

        # Initiate withdrawal
        try:
            transaction = wallet.initiate_withdrawal(
                amount=args['amount'],
                method=args['channel'],
                description=f"Withdrawal to {args['destination']}"
            )
            return jsonify({'message': 'Withdrawal request submitted', 'transaction': transaction.to_dict()}), 200
        except ValueError as e:
            return jsonify({'error': str(e)}), 400

# API Routes (commented out)
# api.add_resource(WalletBalanceResource, '/wallet/balance')
# api.add_resource(WalletTransactionListResource, '/wallet/transactions')
# api.add_resource(WalletWithdrawalRequestResource, '/wallet/withdraw')
