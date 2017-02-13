#!/usr/bin/env bash
docker exec postgres-links /bin/bash -c "psql -U postgres links < schema.sql"
docker exec postgres-links /bin/bash -c "psql -U postgres links < seed.sql"
export NODE_ENV="development"
