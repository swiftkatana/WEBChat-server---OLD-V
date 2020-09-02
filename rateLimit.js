
exports.RateLimit=  class RateLimit{

    constructor() {
     this.rateLimt={};
        
    }

    CheackRateLimit = (ip,time_Limit_In_Millisecond)=>{

        if(this.rateLimt[ip]){
          if(this.rateLimt[ip]>=10){
              console.log(`this ip:${ip} got to the limit  `)
         this.rateLimt[ip]++;
            return false;
          } else{
              this.rateLimt[ip]++;
              return true;
          }
      
        }
        else{
          setTimeout(()=>this.rateLimt[ip]=null,time_Limit_In_Millisecond)
          this.rateLimt[ip]=1;
         
          return true;
    
        }
        
      
      }

}