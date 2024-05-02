-----backend-----

--controllers
"INSERT INTO employees (username, password, contact_number, employees_role) VALUES ($1, $2, $3, $4)"
--
"SELECT * FROM employees WHERE username = $1"
--
"SELECT id, role FROM public.roles;"
--
`SELECT * FROM public."patients-medical-details" ORDER BY id ASC`
--
`INSERT INTO public."patients-medical-details" (patient_medical_name, medical_history, medical_notes, treatment_plans, ic_number) VALUES ($1, $2, $3, $4, $5)`
--
`DELETE FROM public."patients-medical-details" WHERE id = $1`
--
`UPDATE public."patients-medical-details" SET id = $1, patient_medical_name = $2, medical_history = $3, treatment_plans = $4, ic_number = $5`
--
`SELECT pp.id, 
pp.patient_name, 
pp.discharge_patient,
pp.contact_number, 
pp.admission_date, 
pp.discharge_date, 
pp.ic_number, 
pp.ward_number, 
pp.bed_number,
md.*
FROM public."patient-personal-particulars" AS pp
JOIN public."patients-medical-details" AS md
ON pp.ic_number = md.ic_number;`
--
`SELECT pp.id, 
pp.patient_name, 
pp.contact_number, 
pp.discharge_patient,
pp.admission_date, 
pp.discharge_date,  
pp.ic_number, 
pp.ward_number, 
pp.bed_number,
md.*
FROM public."patient-personal-particulars" AS pp
JOIN public."patients-medical-details" AS md
ON pp.id = md.uuid
WHERE pp.ward_number = $1;`
--
`INSERT INTO public."patient-personal-particulars" (patient_name, ic_number, contact_number, ward_number, bed_number, admission_date, discharge_date, discharge_patient) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`
--
`INSERT INTO public."patients-medical-details" (patient_medical_name, medical_history, medical_notes, treatment_plans, uuid, ic_number) VALUES ($1, $2, $3, $4, $5, $6)`
--
`UPDATE public."patient-personal-particulars" 
SET discharge_patient = 'discharge'
WHERE id = $1`
--
`SELECT id, 
ward_number
FROM public."patient-personal-particulars"`
--
`SELECT * FROM public."patient-personal-particulars" WHERE id = $1`
--
`UPDATE public."patient-personal-particulars" 
SET patient_name = $1, 
contact_number = $2, 
ward_number = $3, 
bed_number = $4, 
admission_date = $5, 
discharge_date = $6 ,
ic_number = $7
WHERE id = $8`
--
`UPDATE public."patients-medical-details" 
SET patient_medical_name = $1, 
medical_history = $2, 
medical_notes = $3, 
treatment_plans = $4 
WHERE uuid = $5`
--
"SELECT username, employees_role, contact_number, id FROM public.employees;"
--
"DELETE FROM public.employees WHERE id = $1"
--
"UPDATE public.employees SET username = $1, employees_role = $2, contact_number = $3 WHERE id = $4"
--
--middleware
"SELECT username FROM public.employees WHERE username = $1"
--
"SELECT username FROM public.employees WHERE username = $1"
--
