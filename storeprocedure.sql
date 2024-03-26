delimiter //
create procedure ps_Incendios()
begin
    select latitud,longitud,temperature,date from Satellite WHERE temperature > 40
end //
delimiter

DELIMITER //
CREATE PROCEDURE SP_IncendioFechaReciente()
BEGIN
  SELECT * FROM `Satellite` ORDER BY date DESC LIMIT 5;
END //
DELIMITER ;

