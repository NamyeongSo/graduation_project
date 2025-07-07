FROM node:18-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      python3 \
      python3-pip \
      git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY . .

RUN if [ -f requirements.txt ]; then pip3 install --no-cache-dir -r requirements.txt; fi

EXPOSE 3000-3003 55916

CMD ["node", "main.js"]
