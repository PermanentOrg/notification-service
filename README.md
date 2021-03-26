# Permanent.org Notification Service

This repository contains a service responsible for handling notifications.

## Structure

```
- src
|- controllers // maps between routes to services
|- db          // database queries
|- routes      // endpoint definitions
|- services    // business logic
```

## Usage

1. Install npm packages.

```
npm install
```

2. Create database. See the PostgreSQL [Creating a
   Database](https://www.postgresql.org/docs/current/tutorial-createdb.html)
   tutorial.

3. Configure database, by exporting the `DATABASE_URL` environment variable
   with a valid [PostgreSQL connection
   string](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING).
   Other [node-postgres connection
   variables](https://node-postgres.com/features/connecting) may be used,
   as well.

   For connecting to a remote database over TCP with password authentication:

```
export DATABASE_URL="postgresql://user:password@host/db_name"
```

   For connecting to a local database over a Unix socket with peer
   authentication:

```
export DATABASE_URL="postgresql:///notifications"
export PGHOST="/run/postgresql"
export PGUSER=$(whoami)
```

4. Start the project.

```
npm start
```

5. Verify it is running and configured correctly:

```
curl http://localhost:3000/api/health
```

## Endpoints

### GET /api/health
#### Input
No inputs.

#### Output
Returns a health check.

- `status`: either `available` or `unavailable`.
- `message`: a more detailed explanation about the health status.

### POST /api/notifications
#### Input

- `toUserId`: Id of the user the notification is for.
- `notificationType`: Type of the notification being saved.

#### Output

- `notificationId`: Id of the notification that got created.

## Design Doc

  link: [DESIGN.md](docs/DESIGN.md)

## Contributing

Contributors to this repository agree to adhere to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). To report violations, get in touch with engineers@permanent.org.

## Security

Found a vulnerability? Report this and any other security concerns to engineers@permanent.org.

## License

This code is free software licensed as [AGPLv3](LICENSE), or at your
option, any final, later version published by the Free Software
Foundation.
