> CREATE USER sfcadmin WITH CREATEDB CREATEROLE PASSWORD 'uM94ExBNvjBf';
>
> CREATE DATABASE sfcdatabase;
>
> GRANT ALL PRIVILEGES ON DATABASE sfcdatabase to sfcadmin;
>
> \c sfcdatabase;
>
> GRANT ALL PRIVILEGES ON SCHEMA public TO sfcadmin;
