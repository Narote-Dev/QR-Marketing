# Railway / root-context production image for QrMarketing.Api
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY backend/QrMarketing.Api/QrMarketing.Api.csproj backend/QrMarketing.Api/
RUN dotnet restore backend/QrMarketing.Api/QrMarketing.Api.csproj
COPY backend/ backend/
RUN dotnet publish backend/QrMarketing.Api/QrMarketing.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "QrMarketing.Api.dll"]
