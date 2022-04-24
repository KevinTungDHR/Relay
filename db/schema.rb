# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_24_204820) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "subscriptions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.boolean "pending", default: true, null: false
    t.boolean "signed_in", default: true, null: false
    t.string "subscribeable_type"
    t.bigint "subscribeable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["subscribeable_type", "subscribeable_id"], name: "subscription_id_and_subscription_type"
    t.index ["user_id", "subscribeable_id", "subscribeable_type"], name: "unique_user_subscription", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "display_name", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["display_name"], name: "index_users_on_display_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "workplaces", force: :cascade do |t|
    t.string "name", null: false
    t.string "url", null: false
    t.integer "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["url"], name: "index_workplaces_on_url", unique: true
  end

end
