delimiter //
create procedure ps_Incendios()
begin
    select latitud,longitud,temperature,date from Satellite WHERE temperature > 40
end //
delimiter