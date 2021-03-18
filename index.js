// let id           = $('#nursepatientregistername').val();
// let name         = id;
// let age          = $('#nursepatientregisterage').val();
// let height       = $('#nursepatientregisterheight').val();
// let weight       = $('#nursepatientregisterweight').val();
// let prescription = $('#nursepatientregisterprescription').val();
// let phone        = $('#nursepatientregisterphone').val();
// let emergency    = $('#nursepatientregisteremergency').val();
// let bp           = $('#nursepatientregisterbp').val();
// let sugarlevel   = $('#nursepatientregistersugarlevel').val();
// // let bloodgroup   = $('$nursepatientregisterbloodgroup').val();
// // let gender       = $('$nursepatientregistergender').val();

// console.log(id);
// // console.log(name);
// console.log(age);
// console.log(height);
// console.log(weight);
// console.log(prescription);
// console.log(phone);
// console.log(emergency);
// console.log(bp);
// console.log(sugarlevel);
// // console.log(bloodgroup);
// // console.log(gender);

// firebase.database().ref('doctors/').set({
//     itworks : 'yes'
// });
// firebase.database().ref('nurse/').set({
//     itworks : 'yes'
// });
// firebase.database().ref('patient/').set({
//     itworks : 'yes'
// });

$('#homeloginpage').show();
$('#logincolumn').hide();
$('#patientregistereventdiv').hide();
//  REGISTER EVENT HANDLER : 

$('#doctorregisterbtn').on('click', ()=> {

    console.log("the button was clicked...");
    let doctorid = $('#doctoridinput').val();
    let doctorpassword = $('#doctorpasswordinput').val();
    let isalreadyexist = 0;

    if(doctorid != "" && doctorpassword != "") {

        firebase.database().ref('doctors/').once('value', (snap)=> {

            console.log(snap.val());
            snap.forEach( (childsnap)=> {
                if ( childsnap.val().ID == doctorid){
                    console.log("entered da....");
                    isalreadyexist = 1;
                    alert("The DOCTOR-ID is already exist, try new name...");
                }
                console.log(childsnap.val().ID);
            });

        });

        if (isalreadyexist == 0) {            
            firebase.database().ref('doctors/'+doctorid).set({
                ID : doctorid,
                password : doctorpassword 
            });
        }

        $('#doctoridinput').empty();
        $('#doctorpasswordinput').empty();
    
    } else {
        alert("fill before click the button!...");
    }

});

$('#nurseregisterbtn').on('click', ()=> {

    let nurseid = $('#nurseidinput').val();
    let nursepassword = $('#nursepasswordinput').val();
    let isalreadyexist = 0;

    if(nurseid != "" && nursepassword != "") {

        firebase.database().ref('nurse/').once('value', (snap)=> {
            snap.forEach( (childsnap)=> {
                if ( childsnap.val().ID == nurseid) {
                    isalreadyexist = 1;
                    alert("The NURSE-ID is alerady exist, try new name...");
                }
            });
        });

        if ( isalreadyexist == 0 ) {
            firebase.database().ref('nurse/'+nurseid).set({
                ID : nurseid,
                password : nursepassword 
            });
        }

        // $('#nurseidinput').text('');
        // $('#nursepasswordinput').text('');
    
    }

});

// 
// $('#patientregisterbtn').on('click', ()=> {

//     let nurseid = $('#patientidinput').val();
//     let nursepassword = $('#patientpasswordinput').val();
//     let isalreadyexist = 0;

//     console.log(nurseid);
//     console.log(nursepassword);

//     if(nurseid != "" && nursepassword != "") {

//         if ( isalreadyexist == 0 ) {
//             firebase.database().ref('patient/'+nurseid).update({
//                 ID : nurseid,
//                 password : nursepassword 
//             });
//         }
//     }

// });



// LOGIN EVENT HANDLER :

$('#patientloginbtn').on('click', ()=>{

    firebase.database().ref('patient/').on('value', (snap)=> {
        snap.forEach((childsnap)=> {

            if (childsnap.val().ID==$('#patientidinput').val() && 
                childsnap.val().password==$('#patientpasswordinput').val())
                {
                    $('#homeloginpage').hide();
                    $('#patientregistereventdiv').hide();
                    $('#logincolumn').empty();
                    $('#logincolumn').show();

                    let id = childsnap.val().ID;
                    let name = childsnap.val().name;
                    let age = childsnap.val().age;
                    let height = childsnap.val().height;
                    let weight = childsnap.val().weight;
                    let prescription = childsnap.val().prescription;
                    let phone = childsnap.val().phone;
                    let emergency = childsnap.val().emergency;
                    let bp = childsnap.val().bp;
                    let sugarlevel = childsnap.val().sugarlevel;
                    $('#logincolumn').append(divCreator(id,name,age,height,weight,bp,sugarlevel,prescription,emergency,phone));
                }
        });
    });            

});


$('#doctorloginbtn').on('click', ()=>{

    firebase.database().ref('doctors/').once('value', (doctorsnap)=> {
        doctorsnap.forEach( (doctorchildsnap)=>{

            if ($('#doctoridinput').val()==doctorchildsnap.val().ID && $('#doctorpasswordinput').val()==doctorchildsnap.val().password) {
                
                $('#homeloginpage').hide();
                $('#patientregistereventdiv').hide();
                $('#logincolumn').empty();
                $('#logincolumn').show();

                firebase.database().ref('patient/').on('value', (snap)=> {
                    snap.forEach((childsnap)=> {
                        let id = childsnap.val().ID;
                        let name = childsnap.val().name;
                        let age = childsnap.val().age;
                        let height = childsnap.val().height;
                        let weight = childsnap.val().weight;
                        let prescription = childsnap.val().prescription;
                        let phone = childsnap.val().phone;
                        let emergency = childsnap.val().emergency;
                        let bp = childsnap.val().bp;
                        let sugarlevel = childsnap.val().sugarlevel;
                        $('#logincolumn').append(divCreator(id,name,age,height,weight,bp,sugarlevel,prescription,emergency,phone));
                    });
                });            
            }
        });

    });

});

$('#nurseloginbtn').on('click', (clicked)=> {

    firebase.database().ref('nurse/').once('value', (doctorsnap)=> {
        doctorsnap.forEach( (doctorchildsnap)=>{

            if ($('#nurseidinput').val()==doctorchildsnap.val().ID && $('#nursepasswordinput').val()==doctorchildsnap.val().password) {
                                
                $('#homeloginpage').hide();
                $('#patientregistereventdiv').show();
                $('#logincolumn').show();
            
                
            }
        });

    });
    
});

$('#patientregisterbtnthroughnurse').on('click',()=> {

    let id           = $('#nursepatientregistername').val();
    let name         = id;
    let age          = $('#nursepatientregisterage').val();
    let height       = $('#nursepatientregisterheight').val();
    let weight       = $('#nursepatientregisterweight').val();
    let prescription = $('#nursepatientregisterprescription').val();
    let phone        = $('#nursepatientregisterphone').val();
    let emergency    = $('#nursepatientregisteremergency').val();
    let bp           = $('#nursepatientregisterbp').val();
    let sugarlevel   = $('#nursepatientregistersugarlevel').val();
    // let bloodgroup   = $('$nursepatientregisterbloodgroup').val();
    // let gender       = $('$nursepatientregistergender').val();

    console.log(id);
    console.log(name);
    console.log(age);
    console.log(height);
    console.log(weight);
    console.log(prescription);
    console.log(phone);
    console.log(emergency);
    console.log(bp);
    console.log(sugarlevel);
    // console.log(bloodgroup);
    // console.log(gender);
    
    firebase.database().ref('patient/'+id).set({
        ID : id,
        name : id,
        age : age,
        height : height,
        weight : weight,
        prescription : prescription,
        phone : phone,
        emergency : emergency,
        bp : bp,
        sugarlevel : sugarlevel
        // bloodgroup : bloodgroup,
        // gender : gender
    });            

});


$('#gotohome').on('click', (clicked)=> {
    $('#patientregistereventdiv').hide();
    $('#logincolumn').hide();
    $('#homeloginpage').show();
});





function divCreator(id, name, age, height, weight, bp, sugarlevel, prescription, emergency, phone) {
    let value = '<div class="membersdetails"><div class="left"><h3> <span> NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :</span> ';
    value += ''+name;
    value += '</h3><h3> <span> AGE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </span> ';
    value += ''+age;
    value += '</h3><h3> <span> HEIGHT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </span> ';
    value += ''+height;
    value += '</h3><h3> <span> WEIGHT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span> ';
    value += ''+weight;
    value += '</h3><h3> <span> PHONE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span> ';
    value += ''+phone;
    value += '</h3><h3> <span> EMERGENCY NUM : </span> ';
    value += ''+emergency;
    value += '</h3> </div> <div class="right"><h3> <span> BLOOD PRESSURE : </span> ';
    value += ''+bp;
    value += '</h3> <h3> <span> SUGAR LEVEL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span> ';
    value += ''+sugarlevel;
    value += '</h3><h3> <span> PRESCRIPTION &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span> ';
    value += ''+prescription;
    value += '</h3></div></div>';
    return value;
}

console.log(divCreator('varshni','varshni',20,155,79,"80-120","normal","none",108,1423692369));

/* 

<div class="membersdetails">
    <div class="left">
        <h3> <span> NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :</span> patient1</h3>
        <h3> <span> AGE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </span> patient1</h3>
        <h3> <span> HEIGHT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </span> patient1</h3>
        <h3> <span> WEIGHT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span> patient1</h3>
        <h3> <span> PHONE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span> patient1</h3>
        <h3> <span> EMERGENCY NUM : </span> patient1</h3>
    </div>
    <div class="right">
        <h3> <span> BLOOD PRESSURE : </span> patient1</h3>
        <h3> <span> SUGAR LEVEL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span> patient1</h3>
        <h3> <span> PRESCRIPTION &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </span> patient1</h3>
    </div>
</div>

*/
