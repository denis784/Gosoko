# Use the official PostgreSQL image as the base image
FROM postgres:alpine

# Copy custom configuration file
COPY postgresql.conf /etc/postgresql/postgresql.conf

# Set up a volume and define the mounting point
VOLUME /var/lib/postgresql/data

# Expose the PostgreSQL port
EXPOSE 5432

# Start the PostgreSQL service
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
