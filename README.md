# README
# Chatspace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
- has_many :chatgroups
- has_many :messages

## chatgroupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|add_member|string|null: false|
|member|string|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- has_many :messages
- has_many :users_chatgroups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|text|null: true|
|chatgroup_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :chatgroup

## users_chatgroupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|chatgroup_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :chatgroup

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
