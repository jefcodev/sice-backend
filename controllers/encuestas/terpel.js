const db_mysql = require('../../database/config').db_mysql;

const getPreguntas = async (req, res) => {
  try {
      const query = `
      SELECT 
	   Id,
	   Fecha_Creado,
	   DATE(Fecha_Creado) AS Fecha,
	   Nombre_Encuestador,
	   Nombre_Establecimiento,
	   Region,
	   Provincia,
	   Ciudad,
	   Sector,
	   Direccion,
	   Numero,
	   Transversal,
	   Geolocalizacion,
	   MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000036' THEN Respuesta ELSE NULL END) AS tipo_de_vehiculo_atiende,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000001' THEN Respuesta ELSE NULL END) AS tipo_local,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000065' THEN Respuesta ELSE NULL END) AS Desea_continuar_con_la_encuesta,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000002' THEN Respuesta ELSE NULL END) AS Es_almacen_motos,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000004' THEN Respuesta ELSE NULL END) AS Realiza_cambio_CITU,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000066' THEN Respuesta ELSE NULL END) AS numero_cambios_al_mes,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000003' THEN Respuesta ELSE NULL END) AS Vende_Mobil,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000006' THEN Respuesta ELSE NULL END) AS marcas_lubricantes,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000037' THEN Respuesta ELSE NULL END) AS otras_marcas,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000067' THEN Respuesta ELSE NULL END) AS precios_vehiculo_livianos,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000007' THEN Respuesta ELSE NULL END) AS precio_galon_filtro_Mobil_Special_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000008' THEN Respuesta ELSE NULL END) AS Golden_Bear_5K_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000009' THEN Respuesta ELSE NULL END) AS Valvoline_Racing_VR1_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000011' THEN Respuesta ELSE NULL END) AS Havoline_Mineral_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000012' THEN Respuesta ELSE NULL END) AS precio_galon_filtro_Mobil_Special_10W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000013' THEN Respuesta ELSE NULL END) AS Valvoline_Racing_VR1_10W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000014' THEN Respuesta ELSE NULL END) AS Havoline_Mineral_10W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000015' THEN Respuesta ELSE NULL END) AS Precio_galon_filtro_Mobil_Super_etiqueta_Roja_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000016' THEN Respuesta ELSE NULL END) AS Kendall_GT_1_High_Performance_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000017' THEN Respuesta ELSE NULL END) AS Valvoline_Premium_Protection_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000018' THEN Respuesta ELSE NULL END) AS Havoline_Synthetic_Technology_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000019' THEN Respuesta ELSE NULL END) AS Amalie_Pro_High_Performance_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000020' THEN Respuesta ELSE NULL END) AS Precio_galon_filtro_Mobil_Super_etiqueta_Roja_10W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000021' THEN Respuesta ELSE NULL END) AS Valvoline_Premium_Protection_10W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000022' THEN Respuesta ELSE NULL END) AS Amalie_Pro_High_Performance_10W30_Roja,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000023' THEN Respuesta ELSE NULL END) AS Precio_galon_filtro_Mobil_Super_etiqueta_Azul_10W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000024' THEN Respuesta ELSE NULL END) AS Kendall_GT_1_High_Performance_10W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000025' THEN Respuesta ELSE NULL END) AS Havoline_Synthetic_Technology_10W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000026' THEN Respuesta ELSE NULL END) AS Amalie_Pro_High_Performance_10W30_Azul,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000027' THEN Respuesta ELSE NULL END) AS Precio_galon_filtro_Mobil_Super_etiqueta_Azul_5W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000028' THEN Respuesta ELSE NULL END) AS Kendall_GT1_High_Performance_5W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000029' THEN Respuesta ELSE NULL END) AS Havoline_Synthetic_Technology_5W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000030' THEN Respuesta ELSE NULL END) AS Amalie_Imperial_5W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000031' THEN Respuesta ELSE NULL END) AS Precio_galon_filtro_Mobil_5W30_etiqueta_Gris,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000032' THEN Respuesta ELSE NULL END) AS Kendall_GT1_Max_Dexos_5W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000033' THEN Respuesta ELSE NULL END) AS Valvoline_Full_Synthetic_Premium_Protection_5W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000034' THEN Respuesta ELSE NULL END) AS Havoline_ProDS_5W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000035' THEN Respuesta ELSE NULL END) AS Amalie_Elixir_5W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000068' THEN Respuesta ELSE NULL END) AS PRECIO_MOTOS,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000038' THEN Respuesta ELSE NULL END) AS precio_litro_filtro_Mobil_Super_Moto_4T_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000039' THEN Respuesta ELSE NULL END) AS Motul_5100_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000040' THEN Respuesta ELSE NULL END) AS Castrol_Actevo_4T_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000041' THEN Respuesta ELSE NULL END) AS Valvoline_4Tech_Premium_20W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000042' THEN Respuesta ELSE NULL END) AS precio_litro_filtro_Mobil_Super_Moto_4T_MX_15W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000043' THEN Respuesta ELSE NULL END) AS Motul_5100_15W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000044' THEN Respuesta ELSE NULL END) AS Ipone_Moto_15_5_15W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000045' THEN Respuesta ELSE NULL END) AS Ipone_R4000_15W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000046' THEN Respuesta ELSE NULL END) AS Valvoline_4Tech_Extra_15W50,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000047' THEN Respuesta ELSE NULL END) AS precio_litro_filtro_Mobil_Super_Moto_4T_MX_10W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000048' THEN Respuesta ELSE NULL END) AS Motul_10W30,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000049' THEN Respuesta ELSE NULL END) AS precio_litro_filtro_Mobil_Super_Moto_4T_MX_10W40,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000050' THEN Respuesta ELSE NULL END) AS Motul_5100_10W40,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000051' THEN Respuesta ELSE NULL END) AS Ipone_Moto_10_4_10W40,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000052' THEN Respuesta ELSE NULL END) AS Ipone_R4000_10W40,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000053' THEN Respuesta ELSE NULL END) AS Valvoline_4Tech_Extra_Extra,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000054' THEN Respuesta ELSE NULL END) AS precio_litro_filtro_Mobil_Super_Moto_4T_MX_10W40_Scooter,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000055' THEN Respuesta ELSE NULL END) AS Scooter_Expert_4T_MA_10W40,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000056' THEN Respuesta ELSE NULL END) AS Ipone_SCOOT4_10W40,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000057' THEN Respuesta ELSE NULL END) AS precio_litro_filtro_Mobil_1_Racing_4T_10W40,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000058' THEN Respuesta ELSE NULL END) AS Motul_7100_10W40_4T,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000059' THEN Respuesta ELSE NULL END) AS Ipone_KATANA_OFF_ROAD_10W40,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000060' THEN Respuesta ELSE NULL END) AS precio_litro_filtro_Mobil_Super_Moto_2T,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000061' THEN Respuesta ELSE NULL END) AS Motul_510_2T,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000062' THEN Respuesta ELSE NULL END) AS Castrol_Actevo_Essentials_2T,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000063' THEN Respuesta ELSE NULL END) AS Valvoline_Super_2T,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000064' THEN Respuesta ELSE NULL END) AS observaciones,
       MAX(CASE WHEN Pregunta = '8d683dcc-ter-4c07-a91a-19e6b8000069' THEN Respuesta ELSE NULL END) AS rotulo_mobil,
       CONCAT('http://servertelefonica.gosice.com/shop-detail/b20530f3-e668-4810-9e29-00d9f319ad5a/', SUBSTRING_INDEX(SUBSTRING_INDEX(Foto, '/', 3), '/', -1)) AS URL_Foto
	   FROM (
      SELECT 
      	s.id as Id,
      	s.name AS Nombre_Establecimiento,
    	s.created_at AS Fecha_Creado,
    	s.address_main_street AS Direccion,
    	s.address_number AS Numero,
    	s.address_cross AS Transversal,
    	s.address_reference AS Referencia,
    	s.geolocation AS Geolocalizacion,
    	s.sector AS Sector,
        sa.answer AS Respuesta,
        pq.id AS Pregunta,
        sph.photo AS Foto,
        c.description AS Region,
        ca.description AS Provincia,
        ca1.description AS Ciudad,
        us.name AS Nombre_Encuestador
    FROM shops s
    INNER JOIN shop_answers sa ON s.id = sa.shop_id
    INNER JOIN users us ON s.user_id = us.id
    INNER JOIN shop_poll sp ON s.id = sp.shop_id
    INNER JOIN shop_photos sph ON sph.shop_id = sp.shop_id
    INNER JOIN catalogues c  ON  c.id = s.region_id
    INNER JOIN catalogues ca  ON  ca.id = s.state_id
    INNER JOIN catalogues ca1  ON  ca1.id = s.city_id
    INNER JOIN poll_questions pq ON sa.poll_question_id = pq.id
    WHERE sp.poll_id = 'b20530f3-e668-4814-9e29-00d9f319ad5a'
) AS PivotData
GROUP BY Nombre_Establecimiento` ;

      const preguntas = await new Promise((resolve, reject) => {
          db_mysql.query(query, (err, results) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(results);
              }
          });
      });

      res.status(200).json({
        ok: true,
        preguntas
      });

  } catch (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({
        ok: false,
        msg: 'Error al obtener las preguntas' 
      });
  } }

module.exports = {
    getPreguntas
}
