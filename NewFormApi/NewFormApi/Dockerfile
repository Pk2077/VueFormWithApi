# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0-nanoserver-1809 AS build
WORKDIR /src
COPY ["NewFormApi.csproj", "NewFormApi/"]
RUN dotnet restore "./NewFormApi/NewFormApi.csproj"
COPY . .
WORKDIR "/src/NewFormApi"
RUN dotnet build "./NewFormApi.csproj" -c Release -o /app/build

# Publish Stage
FROM build AS publish
RUN dotnet publish "./NewFormApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0-nanoserver-1809 AS final
WORKDIR /app
EXPOSE 8880
EXPOSE 8881
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NewFormApi.dll"]
