class AlimentoService{
    constructor(http){        
        this._proximoId = 1;
        this._http = http;
        localStorage.setItem("alimentos", JSON.stringify(new Array()));        
    }

    listar(){
        return JSON.parse(localStorage.getItem("alimentos"));
    }

    distanciar(alimentosNaView){        
        var alimentos = JSON.parse(localStorage.getItem("alimentos"));
        var usuario = JSON.parse(localStorage.getItem("localizacao"));

        var service = new google.maps.DistanceMatrixService();

        for(var x = 0; x < alimentos.length; x++){
            service.getDistanceMatrix({
                origins: [usuario.localizacao],
                destinations: [alimentos[x].localizacao],
                travelMode: google.maps.TravelMode.DRIVING
                }, 
                function(response, status) {
                    if (status == google.maps.DistanceMatrixStatus.OK) {
                        //console.log(response.rows[0].elements[0]);
                        console.log(alimentos);
                        console.log(x);
                        alimentos[x].distancia = response.rows[0].elements[0].distance.value;
                        //alimento.distancia = response.rows[0].elements[0].distance.text;
                        console.log(alimentosNaView.length)
                        console.log("recarregat tabrla")
                        alimentosNaView.push(alimentos[x]);
                        console.log(alimentosNaView.length)                                            
                        //alert("Distância:" + response.rows[0].elements[0].distance.text);
                        //alert("Duração:" + response.rows[0].elements[0].duration.text);
                    }
                }
            );
        }
    }

    buscarPeloId(id){
        var alimentos = JSON.parse(localStorage.getItem("alimentos")).filter(function(alimento){
            if(alimento.id == id)
                return alimento;                         
        })[0];
    }

    salvar(alimento){
        console.log(localStorage.getItem("alimentos"));
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