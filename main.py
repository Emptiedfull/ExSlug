import fastapi
from fastapi.responses import RedirectResponse,FileResponse
from fastapi.staticfiles import StaticFiles
import dbhandler,os


app = fastapi.FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')

@app.get("/")
def read_root():

    return FileResponse("static/index.html")

@app.get("/admin")
def admin(code:int):
    try:
        cor = int(os.environ['CODE'])
    except:
        cor = 1234

    if code != cor:
        return {"message": "Access Denied"}
    return FileResponse("static/admin.html")

@app.post("/add_slug")
def add_slag(slug:str,url:str):

    conn = dbhandler.get_conn()
    cursor = conn.cursor()
    try:
        dbhandler.add_slug(cursor,slug,url)
        conn.commit()
    finally:
        cursor.close()
        conn.close()
    return {"slug": slug, "url": url}

@app.post("/remove_slug")
def remove_slug(slug:str):
    conn = dbhandler.get_conn()
    cursor = conn.cursor()
    try:
        dbhandler.remove_slug(cursor,slug)
        conn.commit()
    finally:
        cursor.close()
        conn.close()
    return {"slug": slug}

@app.get("/slugs")
def slugs():
    conn = dbhandler.get_conn()
    cursor = conn.cursor()
    try:
        slugs = dbhandler.get_slugs(cursor)
    finally:
        cursor.close()
        conn.close()
    return {"slugs": slugs}

@app.get("/{slug}")
def redirect(slug:str):
    conn = dbhandler.get_conn()
    cursor = conn.cursor()
    try:
        slug = dbhandler.get_slug(cursor,slug)
    except Exception as e:
        slug = None
    finally:
        cursor.close()
        conn.close()

    url = "https://www.google.com"
    if slug:
        url = slug[1]
    
    return RedirectResponse(url)


