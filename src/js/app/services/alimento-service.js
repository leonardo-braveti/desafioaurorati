class AlimentoService{
    constructor(http){        
        this._proximoId = 1;
        this._http = http;
        localStorage.setItem("alimentos", JSON.stringify(new Array()));        
    }

    listar(){
        return JSON.parse(localStorage.getItem("alimentos"));
    }

    distanciar(alimento, usuario){
       console.log(alimento);
       console.log(usuario);
       //ar alimentos = JSON.parse(localStorage.getItem("alimentos"));

        var service = new google.maps.DistanceMatrixService();
        
            service.getDistanceMatrix({
                origins: [usuario.localizacao],
                destinations: [alimento.localizacao],
                travelMode: google.maps.TravelMode.DRIVING
                }, 
                function(response, status){
                    if (status == google.maps.DistanceMatrixStatus.OK){
                        //console.log(response.rows[0].elements[0])
                        alimento.distancia = response.rows[0].elements[0].distance.value;
                        console.log("A distancia para o endereco é de " + response.rows[0].elements[0].distance.text);
                        //alimentosNaView.push(alimentos[x]);
                        //alert("Distância:" + response.rows[0].elements[0].distance.text);
                        //alert("Duração:" + response.rows[0].elements[0].duration.text);

			return alimento;
                    }
                }
            );   
    }

    buscarPeloId(id){
        var alimentos = JSON.parse(localStorage.getItem("alimentos")).filter(function(alimento){
            if(alimento.id == id)
                return alimento;                         
        })[0];
    }

    salvar(alimento){
        var alimentos = JSON.parse(localStorage.getItem("alimentos"));
        
        if(alimento.id == null){
            alimento.id = this._proximoId;
            alimentos.push(alimento);            
            
            this._proximoId++;
            localStorage.setItem("alimentos", JSON.stringify(alimentos));
        }
        else{
            var alimentos = JSON.parse(localStorage.getItem("alimentos")).filter(function(corrente){
                if(alimento.id == corrente.id)
                    corrente = alimento;
                return corrente;                
            });
            localStorage.setItem("alimentos", JSON.stringify(alimentos));
        }
    }

    excluir(id){
        var alimentos = JSON.parse(localStorage.getItem("alimentos")).filter(function(alimento){
            if(alimento.id != id)
                return alimento;
        });
        var conversao = JSON.stringify(alimentos);
        localStorage.setItem("alimentos", alimentos);
    }
}

AlimentoService.$inject = ['$http'];

angular.module('desafioaurorati')
        .service('alimentoService', AlimentoService);
