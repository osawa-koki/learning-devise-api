class User < ApplicationRecord
  # devise_token_authで必要なモジュールをincludeする
  include DeviseTokenAuth::Concerns::User

  # deviseで必要なモジュールを指定する
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
end
