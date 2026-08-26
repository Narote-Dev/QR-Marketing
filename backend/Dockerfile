FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY QrMarketing.Api/QrMarketing.Api.csproj QrMarketing.Api/
RUN dotnet restore QrMarketing.Api/QrMarketing.Api.csproj
COPY . .
RUN dotnet publish QrMarketing.Api/QrMarketing.Api.csproj -c Release -o /app/publish /p:UseAppHost=false
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "QrMarketing.Api.dll"]
