# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160701182011) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "annotations", force: :cascade do |t|
    t.integer  "song_id",     null: false
    t.text     "body",        null: false
    t.integer  "start_index", null: false
    t.integer  "end_index",   null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "author_id"
  end

  add_index "annotations", ["author_id"], name: "index_annotations_on_author_id", using: :btree
  add_index "annotations", ["song_id"], name: "index_annotations_on_song_id", using: :btree
  add_index "annotations", ["start_index", "end_index"], name: "index_annotations_on_start_index_and_end_index", using: :btree

  create_table "songs", force: :cascade do |t|
    t.string   "artist",         null: false
    t.string   "title",          null: false
    t.text     "lyrics",         null: false
    t.string   "youtube_url"
    t.string   "soundcloud_url"
    t.string   "featuring"
    t.string   "produced_by"
    t.string   "written_by"
    t.date     "release_date"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.text     "about"
  end

  add_index "songs", ["artist", "title"], name: "index_songs_on_artist_and_title", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "username",               default: "", null: false
  end

  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username", "email"], name: "index_users_on_username_and_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  add_foreign_key "annotations", "songs"
  add_foreign_key "annotations", "users", column: "author_id"
end
