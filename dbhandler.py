import os
import psycopg2



DATABASE_URL = os.environ['DATABASE_URL']


def get_conn():
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    return conn

def list_tables(cursor):
    cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name;")
    tables = cursor.fetchall()
  
    return tables

def get_slugs(cursor):
    cursor.execute("SELECT * FROM slugs")
    slugs = cursor.fetchall()
   
    return slugs

def add_slug(cursor,slug,url):
    cursor.execute("INSERT INTO slugs (slug, link) VALUES (%s, %s)", (slug, url))
    return True

def get_slug(cursor,slug):
    cursor.execute("SELECT * FROM slugs WHERE slug = %s", (slug,))
    slug = cursor.fetchone()
    return slug

def remove_slug(cursor,slug):
    cursor.execute("DELETE FROM slugs WHERE slug = %s", (slug,))
    return True
