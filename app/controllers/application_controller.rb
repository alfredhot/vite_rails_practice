class ApplicationController < ActionController::Base
  # template render 가 지정이 안되면 기본으로 layouts/application 으로 지정
  # Comment by GOSOMI
  rescue_from ActionController::MissingExactTemplate do |exception|
    respond_to do |format|
      format.html do
        render template: 'layouts/application', layout: false
      end
    end
  end
end
