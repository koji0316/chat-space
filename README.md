# README
# Chatspace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
- has_many :chatgroups, through: :users_chatgroups
- has_many :messages
- has_many :users_chatgroups

## chatgroupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :user, through: :users_chatgroups
- has_many :messages
- has_many :users_chatgroups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|chatgroup|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :chatgroup

## users_chatgroupsテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|chatgroup|references|null: false, foreign_key: true|
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
