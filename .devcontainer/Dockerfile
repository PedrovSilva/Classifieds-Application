FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /workspace

RUN apt-get update \
    && apt-get install -y \
        git \
        curl \
        nodejs \
        npm \
        netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 5041
EXPOSE 3000

CMD ["sleep", "infinity"]
