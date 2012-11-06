# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Botsnpans::Application.initialize!

ActionMailer::Base.smtp_settings = {
  :user_name => Botsnpans::Application.config.sendgrid_user,
  :password => Botsnpans::Application.config.sendgrid_pass,
  :domain => "botsandpans.com",
  :address => "smtp.sendgrid.net",
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}