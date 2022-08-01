class ApplicationController < ActionController::Base
  # skip_before_action :verify_authenticity_token
  # MUST TAKE THIS OUT BEFORE PRODUCTION
  
  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    session[:session_token] = user.session_token
  end

  def logout!
    return nil if current_user.nil?
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def from_template(template, locals = {})
    JSON.parse(self.class.render(:json, template: template, locals: locals))
  end
end
