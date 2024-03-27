delimiter //
create procedure ps_Incendios()
begin
    select latitud,longitud,temperature,date from Satellite WHERE temperature > 40
end //
delimiter

DELIMITER //
CREATE PROCEDURE SP_IncendioFechaReciente()
BEGIN
  SELECT * FROM `Satellite` where Satellite.temperature > 40 ORDER BY date DESC LIMIT 5;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE getSatellites()
BEGIN
    SELECT s.*, sf.*
    FROM Satellite s
    CROSS JOIN SatelliteForan sf
    WHERE s.temperature > 40 and sf.temperature > 40;
END //
DELIMITER ;