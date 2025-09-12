# URL Shortening Service

App for shortinize urls

## Utils

* `Docker`
* `Docker Compose`
* `golang-migrate/migrate`
* `PostgreSQL`

## Libraries

* `express.js`
* `log4js`
* `dotenv`
* `sqids`
* `typescript`

## Database

`PostgreSQL` is prefered to use.

### urls

| Name        | Type          | Settings                      | References                    | Note                           |
|-------------|---------------|-------------------------------|-------------------------------|--------------------------------|
| **id** | TIMESTAMP | 🔑 PK, not null |  | |
| **node** | SMALLINT | 🔑 PK, not null |  | |
| **short_code** | VARCHAR(32) | not null, unique |  | |
| **original_url** | TEXT | not null |  | | 

#### Indexes
| Name | Unique | Fields |
|------|--------|--------|
| urls_index_0 |  | short |


## Endpoints

* `GET`  `/api/v1/urls/{short_url}` - get full url
* `POST` `/api/v1/urls/` - shortinize url
* `GET`  `/{short_url}` - redirect to source url 

## Run

```
cd app
npm run start
```

or

```
docker compose up
```

> [!NOTE]
> ESLint runs on start
