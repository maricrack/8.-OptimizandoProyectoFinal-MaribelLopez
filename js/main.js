document.getElementById('estudianteForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var nombre = document.getElementById('nombre').value;
        var documento = document.getElementById('documento').value;
        var nota1 = parseFloat(document.getElementById('nota1').value);
        var nota2 = parseFloat(document.getElementById('nota2').value);
        var nota3 = parseFloat(document.getElementById('nota3').value);
        
        var promedio = calcularPromedio([nota1, nota2, nota3]);
        
        var estu = {
          nombre: nombre,
          documento: documento,
          notas: [nota1, nota2, nota3],
          promedio: promedio
        };
        
        var agenda = JSON.parse(localStorage.getItem('agenda')) || [];
        agenda.push(estu);
        localStorage.setItem('agenda', JSON.stringify(agenda));
        
        Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Datos guardados correctamente.',
                showConfirmButton: false,
                timer: 1500
              });
        mostrarAgenda();
        
  
        document.getElementById('nombre').value = '';
        document.getElementById('documento').value = '';
        document.getElementById('nota1').value = '';
        document.getElementById('nota2').value = '';
        document.getElementById('nota3').value = '';
      });
      
      function mostrarAgenda() {
        var agenda = JSON.parse(localStorage.getItem('agenda')) || [];
        var aprobadosList = document.getElementById('aprobados-list');
        var desaprobadosList = document.getElementById('desaprobados-list');
        aprobadosList.innerHTML = '';
        desaprobadosList.innerHTML = '';
        
        agenda.forEach(function(estu, index) {
          var li = document.createElement('li');
          li.innerHTML = '<strong>' + estu.nombre + '</strong> - documento: ' + estu.documento + ' - Promedio de notas: ' + estu.promedio;
          
          var button = document.createElement('button');
          button.textContent = 'Eliminar';
          button.addEventListener('click', function() {
            eliminarContacto(index);
          });
      
          li.appendChild(button);
          if (estu.promedio >= 3) {
            aprobadosList.appendChild(li);
          } else {
            desaprobadosList.appendChild(li);
          }
        });
      }
      
      function eliminarContacto(index) {
        var agenda = JSON.parse(localStorage.getItem('agenda')) || [];
        agenda.splice(index, 1);
        localStorage.setItem('agenda', JSON.stringify(agenda));
        Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Datos eliminados de forma exitosa.',
                showConfirmButton: false,
                timer: 1500
              });
        mostrarAgenda();
      }
      
      function calcularPromedio(notas) {
        var sum = notas.reduce(function(acc, val) 
        {
          return acc + val;
        }, 0);
        return (sum / notas.length).toFixed(2);
      }
      
        mostrarAgenda();

function obtenerDatosAPI() {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(data => {
            localStorage.setItem('agendaAPI', JSON.stringify(data));
            console.log('Datos de la API almacenados en localStorage:', data);
          })
          .catch(error => console.error('Error al obtener datos de la API:', error));
      }
      
        obtenerDatosAPI();