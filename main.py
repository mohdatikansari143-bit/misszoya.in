from datetime import datetime, timezone
from pathlib import Path
import uuid

from fastapi import FastAPI, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Trex Wallet Posts API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MEDIA_DIR = Path("media")
MEDIA_DIR.mkdir(exist_ok=True)

app.mount("/media", StaticFiles(directory=str(MEDIA_DIR)), name="media")

posts = []


@app.get("/")
def root():
    return {"message": "Trex Wallet Posts API is running"}


@app.get("/posts")
def get_posts():
    return posts


@app.post("/posts")
async def create_post(
    name: str = Form(...),
    description: str = Form(...),
    media: UploadFile | None = File(default=None),
):
    image = None
    video = None

    if media:
        content_type = media.content_type or ""

        if not (
            content_type.startswith("image/")
            or content_type.startswith("video/")
        ):
            return {"error": "Only image and video files are allowed"}

        safe_name = Path(media.filename or "upload").name
        filename = f"{uuid.uuid4().hex}_{safe_name}"
        file_path = MEDIA_DIR / filename

        with open(file_path, "wb") as output:
            output.write(await media.read())

        if content_type.startswith("image/"):
            image = f"/media/{filename}"
        else:
            video = f"/media/{filename}"

    post = {
        "id": len(posts) + 1,
        "name": name,
        "description": description,
        "image": image,
        "video": video,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    posts.insert(0, post)
    return post


@app.get("/health")
def health():
    return {"status": "ok"}
