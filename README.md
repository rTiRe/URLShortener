# URL Shortening Service

## Libraries

* `express.js`
* `log4js`
* `dotenv`
* `sqids`

## Database

`PostgreSQL` is prefered to use.

### urls

| Name        | Type          | Settings                      | References                    | Note                           |
|-------------|---------------|-------------------------------|-------------------------------|--------------------------------|
| **id** | TIMESTAMP | 🔑 PK, not null |  | |
| **node** | SMALLINT | 🔑 PK, not null |  | |
| **short** | VARCHAR(32) | not null, unique |  | |
| **full** | TEXT | not null |  | | 

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
npm run start
```

> [!NOTE]
> ESLint runs on start
