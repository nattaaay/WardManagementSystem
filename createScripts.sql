-- Table: public.employees

-- DROP TABLE IF EXISTS public.employees;

CREATE TABLE IF NOT EXISTS public.employees
(
    username character varying COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    contact_number bigint,
    employees_role integer,
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    CONSTRAINT employees_pkey PRIMARY KEY (id),
    CONSTRAINT employees_employees_role_fkey FOREIGN KEY (employees_role)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employees
    OWNER to natashaishak;

-------------------------------------------------------------------------

-- Table: public.patient-personal-particulars

-- DROP TABLE IF EXISTS public."patient-personal-particulars";

CREATE TABLE IF NOT EXISTS public."patient-personal-particulars"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    patient_name name COLLATE pg_catalog."C",
    contact_number integer,
    admission_date date,
    ic_number text COLLATE pg_catalog."default",
    ward_number text COLLATE pg_catalog."default",
    bed_number text COLLATE pg_catalog."default",
    discharge_patient text COLLATE pg_catalog."default",
    discharge_date text COLLATE pg_catalog."default",
    CONSTRAINT "patients-personal-particulars_pkey" PRIMARY KEY (id),
    CONSTRAINT "patients-personal-particulars_patient_name_key" UNIQUE (patient_name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."patient-personal-particulars"
    OWNER to natashaishak;

-------------------------------------------------------------------------

-- Table: public.patients-medical-details

-- DROP TABLE IF EXISTS public."patients-medical-details";

CREATE TABLE IF NOT EXISTS public."patients-medical-details"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    patient_medical_name name COLLATE pg_catalog."C",
    medical_history text COLLATE pg_catalog."default",
    medical_notes text COLLATE pg_catalog."default",
    treatment_plans text COLLATE pg_catalog."default",
    ic_number text COLLATE pg_catalog."default",
    uuid integer,
    CONSTRAINT "patients-medical-details_pkey" PRIMARY KEY (id),
    CONSTRAINT "patients-medical-details_patient_medical_name_key" UNIQUE (patient_medical_name),
    CONSTRAINT uuid_fk FOREIGN KEY (uuid)
        REFERENCES public."patient-personal-particulars" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."patients-medical-details"
    OWNER to natashaishak;

-------------------------------------------------------------------------

-- Table: public.roles

-- DROP TABLE IF EXISTS public.roles;

CREATE TABLE IF NOT EXISTS public.roles
(
    id integer NOT NULL,
    role character varying COLLATE pg_catalog."default",
    CONSTRAINT roles_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.roles
    OWNER to natashaishak;