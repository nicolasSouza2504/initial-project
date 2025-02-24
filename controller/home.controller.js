var $ctrl = this;

$ctrl.loadSection = loadSection;
$ctrl.onInit = onInit;


function onInit() {
    $ctrl.loadSection('home');
}

function loadSection(sectionId) {

    document.querySelectorAll('.content section').forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';

}


$ctrl.onInit();
