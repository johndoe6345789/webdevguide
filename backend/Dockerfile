# ---------- build stage ----------
FROM python:3.12-slim AS builder

WORKDIR /build

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ---------- runtime stage ----------
FROM python:3.12-slim

WORKDIR /app

COPY --from=builder /install /usr/local

COPY . .

EXPOSE 5000

ENV FLASK_APP=app:create_app

CMD ["python", "entrypoint.py"]
