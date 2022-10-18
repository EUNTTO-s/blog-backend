Table users {
  id int [pk, increment] // auto-increment
  email varchar(100) [unique, not null]
	nickname varchar(50)
	password varchar(300) [not null]
  profile_image varchar(3000)
  created_at datetime [default: `now()`]
}

Table postings {
  id int [pk, increment] // auto-increment
  user_id int [not null]
  contents varchar(2000) [null]
  created_at datetime [default: `now()`]
  updated_at "datetime default now() ON UPDATE now()"
}
Ref: postings.user_id > users.id

Table posting_images {
	id int [pk, increment]
	posting_id int [not null]
	image_url varchar(3000)
	created_at datetime [default: `now()`]
}
Ref: posting_images.posting_id > postings.id

Table comments {
	id int [pk, increment]
	comment varchar(2000)
	posting_id int [not null]
	user_id int [not null]
  created_at datetime [default: `now()`]
  updated_at "datetime default now() ON UPDATE now()"
}
Ref: comments.posting_id > postings.id
Ref: comments.user_id > users.id

Table likes_postings_users {
	user_id int [not null]
	posting_id int [not null]
  created_at datetime [default: `now()`]
  updated_at "datetime default now() ON UPDATE now()"
  
  Indexes {
    (user_id, posting_id) [pk]
  }
}

Ref: likes_postings_users.posting_id > postings.id
Ref: likes_postings_users.user_id > users.id
