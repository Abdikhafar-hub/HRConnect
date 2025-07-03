import os
import logging
from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
import openai
from db import db
from config import DevelopmentConfig
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from twilio_client import client as twilio_client, TWILIO_PHONE
from dotenv import load_dotenv
from Worker.model.shared.placeholder_models import Employer, Admin

load_dotenv()

# Initialize logging
logging.basicConfig(level=logging.INFO)
logging.info("Initializing WorkConnect application...")

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(DevelopmentConfig)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)
api = Api(app)

# Import and register profile REST routes
from Worker.routes.profile_routes import register_profile_routes
register_profile_routes(api)

# Set OpenAI API key
openai.api_key = app.config['OPENAI_API_KEY']

# Initialize Twilio client
twilio_client = Client(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN'])
logging.info("✅ Twilio client initialized successfully.")

# Register Blueprints for non-RESTful routes
from Worker.routes.auth_routes import auth_bp
from Worker.routes.whatsapp_routes import whatsapp_bp
from Worker.routes.ussd_routes import ussd_bp

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(whatsapp_bp, url_prefix='/whatsapp')
app.register_blueprint(ussd_bp, url_prefix='/ussd')

# Import and bind RESTful API resources
from Worker.routes.jobs_routes import (
    WorkerJobListResource,
    WorkerJobDetailResource,
    WorkerJobCheckInOutResource,
    WorkerJobCompletionResource,
    WorkerJobRequestLogResource,
    WorkerJobContractListResource,
    WorkerAttendanceListResource
)
from Worker.routes.wallet_routes import (
    WalletBalanceResource,
    WalletTransactionListResource,
    WalletWithdrawalRequestResource
)
from Worker.routes.notification_routes import (
    NotificationListResource,
    NotificationReadResource,
    NotificationPreferenceResource
)
from Worker.routes.dispute_routes import (
    WorkerReportListResource,
    WorkerReportResource,
    WorkerReportCreateResource
)
from Worker.routes.chat_routes import (
    StartConversationResource,
    SendMessageResource,
    ConversationMessagesResource,
    MarkMessageReadResource
)
from Worker.routes.availability_routes import (
    AvailabilityStatusResource,
    NotificationScheduleListResource
)
from Worker.routes.rating_routes import (
    WorkerRatingListResource,
    WorkerRatingDetailResource,
    WorkerFeedbackListResource,
    WorkerFeedbackCreateResource
)

# RESTful API resource bindings
api.add_resource(WorkerJobListResource, '/api/worker/jobs')
api.add_resource(WorkerJobDetailResource, '/api/worker/jobs/<int:job_id>')
api.add_resource(WorkerJobCheckInOutResource, '/api/worker/jobs/check')
api.add_resource(WorkerJobCompletionResource, '/api/worker/jobs/complete')
api.add_resource(WorkerJobRequestLogResource, '/api/worker/jobs/requests')
api.add_resource(WorkerJobContractListResource, '/api/worker/jobs/contracts')
api.add_resource(WorkerAttendanceListResource, '/api/worker/jobs/attendance')

api.add_resource(WalletBalanceResource, '/api/worker/wallet/balance')
api.add_resource(WalletTransactionListResource, '/api/worker/wallet/transactions')
api.add_resource(WalletWithdrawalRequestResource, '/api/worker/wallet/withdraw')

api.add_resource(NotificationListResource, '/api/worker/notifications')
api.add_resource(NotificationReadResource, '/api/worker/notifications/<int:notification_id>/read')
api.add_resource(NotificationPreferenceResource, '/api/worker/notifications/preferences')

api.add_resource(WorkerReportListResource, '/api/worker/reports')
api.add_resource(WorkerReportResource, '/api/worker/reports/<int:report_id>')
api.add_resource(WorkerReportCreateResource, '/api/worker/reports')

api.add_resource(StartConversationResource, '/api/worker/chat/start')
api.add_resource(SendMessageResource, '/api/worker/chat/send')
api.add_resource(ConversationMessagesResource, '/api/worker/chat/<int:conversation_id>/messages')
api.add_resource(MarkMessageReadResource, '/api/worker/chat/<int:message_id>/read')

api.add_resource(AvailabilityStatusResource, '/api/worker/availability/status')
api.add_resource(NotificationScheduleListResource, '/api/worker/availability/schedule')

api.add_resource(WorkerRatingListResource, '/api/worker/ratings')
api.add_resource(WorkerRatingDetailResource, '/api/worker/ratings/<int:rating_id>')
api.add_resource(WorkerFeedbackListResource, '/api/worker/ratings/<int:rating_id>/feedbacks')
api.add_resource(WorkerFeedbackCreateResource, '/api/worker/ratings/<int:rating_id>/feedbacks')

# Root route
@app.route('/')
def index():
    return {"message": "Welcome to WorkConnect API!"}

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)), debug=True)
