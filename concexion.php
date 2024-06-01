<?php

class Cconexion {

    function ConexionBD() {
        $host = '127.0.0.1';
        $dbname = 'MusiCCA';
        $username = 'ALVARINO\Usuario';
        $password = '';
        $puerto = '1433';

        try {
            $conn = new PDO("sqlsrv:Server=$host,$puerto;Database=$dbname", $username, $password);
            echo "Se conectó correctamente a la base de datos<br>";
        } catch (PDOException $exp) {
            echo ("No se logró conectar correctamente con la base de datos: $dbname, error: $exp");
        }

        return $conn;
    }
}

// Instanciar la clase y obtener la conexión
$conexion = new Cconexion();
$conn = $conexion->ConexionBD();

// Verificar la conexión
if (!$conn) {
    die("Conexión fallida: " . $conn->connect_error);
}

// ARTISTA MÁS POPULAR
$sql1 = "SELECT TOP 10 A.[Artist Name(s)], MAX(C.[Popularity]) AS MaxPopularity
         FROM [Artista$] A
         JOIN [Album$] B ON A.[Artista_ID] = B.[Artista_ID]
         JOIN [Cancion$] C ON B.[Album_ID] = C.[Album_ID]
         GROUP BY A.[Artist Name(s)]
         ORDER BY MaxPopularity DESC;";
$result1 = $conn->query($sql1);
echo "Artistas más populares:<br>";
while($row = $result1->fetch(PDO::FETCH_ASSOC)) {
    echo "Nombre: " . $row["Artist Name(s)"]. " - Popularidad: " . $row["MaxPopularity"]. "<br>";
}

echo "<br>";

// ÁLBUMES MÁS RECIENTES HASTA LA FECHA
$sql2 = "SELECT TOP 10 [Album Name], [Album Release Date]
         FROM [Album$]
         ORDER BY [Album Release Date] DESC;";
$result2 = $conn->query($sql2);
echo "Álbumes más recientes:<br>";
while($row = $result2->fetch(PDO::FETCH_ASSOC)) {
    echo "Nombre: " . $row["Album Name"]. " - Fecha de lanzamiento: " . $row["Album Release Date"]. "<br>";
}

echo "<br>";

// CANCIONES MÁS POPULARES
$sql3 = "SELECT TOP 1 [Track Name], [Popularity]
         FROM [Cancion$]
         ORDER BY [Popularity] DESC;";
$result3 = $conn->query($sql3);
echo "Canción más popular:<br>";
while($row = $result3->fetch(PDO::FETCH_ASSOC)) {
    echo "Nombre: " . $row["Track Name"]. " - Popularidad: " . $row["Popularity"]. "<br>";
}

echo "<br>";

// ARTISTAS MÁS POPULARES
$sql4 = "SELECT TOP 10 A.[Artist Name(s)], AVG(C.[Popularity]) AS AvgPopularity
         FROM [Artista$] A
         JOIN [Album$] B ON A.[Artista_ID] = B.[Artista_ID]
         JOIN [Cancion$] C ON B.[Album_ID] = C.[Album_ID]
         GROUP BY A.[Artist Name(s)]
         ORDER BY AvgPopularity DESC;";
$result4 = $conn->query($sql4);
echo "Artistas más populares por popularidad promedio:<br>";
while($row = $result4->fetch(PDO::FETCH_ASSOC)) {
    echo "Nombre: " . $row["Artist Name(s)"]. " - Popularidad promedio: " . $row["AvgPopularity"]. "<br>";
}

echo "<br>";

// CANTIDAD DE ÁLBUMES EN LA BASE DE DATOS
$sql5 = "SELECT COUNT(*) AS AlbumCount
         FROM [Album$];";
$result5 = $conn->query($sql5);
$row = $result5->fetch(PDO::FETCH_ASSOC);
echo "Cantidad de álbumes en la base de datos: " . $row["AlbumCount"] . "<br>";

echo "<br>";

// DURACIÓN PROMEDIO DE LAS CANCIONES
$sql6 = "SELECT AVG([Track Duration (ms)])/1000 AS AverageDurationSeconds
         FROM [Cancion$];";
$result6 = $conn->query($sql6);
$row = $result6->fetch(PDO::FETCH_ASSOC);
echo "Duración promedio de las canciones en segundos: " . $row["AverageDurationSeconds"] . "<br>";

echo "<br>";

// CANCIONES MÁS POPULARES DE CADA ÁLBUM
$sql7 = "SELECT B.[Album Name], C.[Track Name], MAX(C.[Popularity]) AS MaxPopularity
         FROM [Album$] B
         JOIN [Cancion$] C ON B.[Album_ID] = C.[Album_ID]
         GROUP BY B.[Album Name], C.[Track Name]
         ORDER BY B.[Album Name], MaxPopularity DESC;";
$result7 = $conn->query($sql7);
echo "Canciones más populares de cada álbum:<br>";
while($row = $result7->fetch(PDO::FETCH_ASSOC)) {
    echo "Álbum: " . $row["Album Name"]. " - Canción: " . $row["Track Name"]. " - Popularidad: " . $row["MaxPopularity"]. "<br>";
}

echo "<br>";

// CANTIDAD DE CANCIONES POR ARTISTA
$sql8 = "SELECT A.[Artist Name(s)], COUNT(C.[Track_ID]) AS SongCount
         FROM [Artista$] A
         JOIN [Album$] B ON A.[Artista_ID] = B.[Artista_ID]
         JOIN [Cancion$] C ON B.[Album_ID] = C.[Album_ID]
         GROUP BY A.[Artist Name(s)];";
$result8 = $conn->query($sql8);
echo "Cantidad de canciones por artista:<br>";
while($row = $result8->fetch(PDO::FETCH_ASSOC)) {
    echo "Artista: " . $row["Artist Name(s)"]. " - Canciones: " . $row["SongCount"]. "<br>";
}

echo "<br>";

// ÁLBUM MÁS LARGO
$sql9 = "SELECT TOP 1 B.[Album Name], SUM(C.[Track Duration (ms)])/1000 AS TotalDurationSeconds
         FROM [Album$] B
         JOIN [Cancion$] C ON B.[Album_ID] = C.[Album_ID]
         GROUP BY B.[Album Name]
         ORDER BY TotalDurationSeconds DESC;";
$result9 = $conn->query($sql9);
$row = $result9->fetch(PDO::FETCH_ASSOC);
echo "Álbum más largo:<br>";
echo "Nombre: " . $row["Album Name"]. " - Duración total en segundos: " . $row["TotalDurationSeconds"]. "<br>";

echo "<br>";

// ARTISTA CON MÁS ÁLBUMES
$sql10 = "SELECT TOP 1 A.[Artist Name(s)], COUNT(B.[Album_ID]) AS AlbumCount
          FROM [Artista$] A
          JOIN [Album$] B ON A.[Artista_ID] = B.[Artista_ID]
          GROUP BY A.[Artist Name(s)]
          ORDER BY AlbumCount DESC;";
$result10 = $conn->query($sql10);
$row = $result10->fetch(PDO::FETCH_ASSOC);
echo "Artista con más álbumes:<br>";
echo "Nombre: " . $row["Artist Name(s)"]. " - Cantidad de álbumes: " . $row["AlbumCount"]. "<br>";

echo "<br>";

// MAYOR AÑO DE LANZAMIENTOS DE ÁLBUMES
$sql11 = "SELECT TOP 10 YEAR([Album Release Date]) AS ReleaseYear, COUNT([Album_ID]) AS AlbumCount
          FROM [Album$]
          GROUP BY YEAR([Album Release Date])
          ORDER BY AlbumCount DESC;";
$result11 = $conn->query($sql11);
echo "Años con más lanzamientos de álbumes:<br>";
while($row = $result11->fetch(PDO::FETCH_ASSOC)) {
    echo "Año: " . $row["ReleaseYear"]. " - Cantidad de álbumes: " . $row["AlbumCount"]. "<br>";
}

// Cierra la conexión
$conn = null;

?>
