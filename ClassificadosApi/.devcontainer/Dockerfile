FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /workspace

RUN apt-get update \
    && apt-get install -y \
        git \
        curl \
        nodejs \
        npm \
        iputils-ping \
        netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*
RUN dotnet tool install --global dotnet-ef
ENV PATH="${PATH}:/root/.dotnet/tools"

EXPOSE 5041
EXPOSE 5000
EXPOSE 3000
