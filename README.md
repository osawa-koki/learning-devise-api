# learning-devise-api

🥨🥨🥨 Devise(devise-token-auth)を使用してAPIで認証を行うサンプルプログラムです。  

## devise-token-authについて

モジュールを追加します。  

```shell
bundle add devise_token_auth
```

モジュールのセットアップを行います。  

```shell
rails g devise:install
rails g devise_token_auth:install User auth
```

`config/initializers/devise_token_auth.rb`を編集します。  

```ruby
config.change_headers_on_each_request = false
```

`config/routes.rb`を編集します。  

```ruby
mount_devise_token_auth_for 'User', at: 'auth'
```

認証を行うコントローラモデルに以下のように記述します。  

```ruby
before_action :authenticate_api_v1_user!
```

`current_api_v1_user`という変数でログインユーザーの情報を取得できます。  
