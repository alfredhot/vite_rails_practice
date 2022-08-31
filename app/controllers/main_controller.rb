class MainController < ApplicationController
  def index
    respond_to do |format|
      format.html do
        render "layouts/application"
      end
      format.json do

      end
    end
  end
end