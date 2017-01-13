class UsuarioService{
    constructor(http){                
        this._http = http;
    }

    localizar(){
         navigator.geolocation.getCurrentPosition(function(position){
            var latlon=position.coords.latitude+","+position.coords.longitude;
  
            const link = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latlon;

            fetch(link)  
                .then(response => response.json()) // retorna uma promise
                .then(result => {                    
                    var localizacao = {"latitude": position.coords.latitude, "longitude": position.coords.longitude, "localizacao": result.results[0].formatted_address};
                    localStorage.setItem("localizacao", JSON.stringify(localizacao));
                    console.log(localizacao);
                })
                .catch(err => {                    
                    console.error('Erro ao obter informação', err);
            });         
         },function(error){
            console.log(error.code);            
        });        
    }

    obterLocalizacao(){
        return JSON.parse(localStorage.getItem("localizacao"));
    }

    salvarLocalizacao(loc){        
        var localizacao = {};
        
        var endereco = loc.logradouro+" - "+loc.bairro+", "+loc.cidade+" - "+loc.estado+", "+loc.cep+", "+loc.pais        
        localizacao.endereco = endereco;

        localStorage.setItem("localizacao", JSON.stringify(localizacao));        
    }
}

UsuarioService.$inject = ['$http'];

angular.module('desafioaurorati')
        .service('usuarioService', UsuarioService);
