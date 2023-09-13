class UsersController < ApplicationController

    def find_or_create_by_id
        user = User.find_or_create_by(user_params)
        session[:user_id] = user.id 
        render json: user
    end

    def get_current_user
        if logged_in
            render json: current_user, status: :ok 
        else
            render json: {errors: ["No user is logged in"]}, status: :bad_request
        end
    end

    private

    def user_params
    params.require(:user).permit(:username, :email, :id, :country)
    end

end
