var selectSze, selectAge, selectGender, selectAnimal, inputZip;
var textSze, textAge, textGender, textAnimal, textZip, textIntro;
var button1, button2;
var imagePet;
var animalPick, genderPick, agePick, szePick;

function setup() {
  noCanvas();

  textIntro = createP("let me help you find your soulmate :)");
  textIntro.id("h1");

  textZip = createP("1. what's your ZIP code?");
  textZip.id("question");
  inputZip = createInput();
  inputZip.id("input");

  textGender = createP("2. what gender do you prefer in a soulmate?");
  textGender.id("question");
  selectGender = createSelect();
  selectGender.id("input");
  selectGender.option("");
  selectGender.option("female", "F");
  selectGender.option("male", "M");
  selectGender.option("why would i care?", "either");
  selectGender.changed(genderEvent);

  textAnimal = createP("3. what do you usually order at the bar?");
  textAnimal.id("question");
  selectAnimal = createSelect();
  selectAnimal.id("input");
  selectAnimal.option("");
  selectAnimal.option("bud light", "dog");
  selectAnimal.option("lambrusco", "cat");
  selectAnimal.option("mezcal margarita", "bird");
  selectAnimal.option("tequila shotzzz!!", "reptile");
  selectAnimal.option("baked potato, no butter", "pig");
  selectAnimal.changed(barEvent);

  textAge = createP("4. what's your favorite movie?");
  textAge.id("question");
  selectAge = createSelect();
  selectAge.id("input");
  selectAge.option("");
  selectAge.option("gone with the wind", "Senior");
  selectAge.option("raiders of the lost ark", "Adult");
  selectAge.option("hunger games", "Young");
  selectAge.option("minions!!", "Baby");
  selectAge.changed(ageEvent);

  textSze = createP("5. what tasty fruit do you like the most?");
  textSze.id("question");
  selectSze = createSelect();
  selectSze.id("input");
  selectSze.option("");
  selectSze.option("blueberry", "S");
  selectSze.option("apple", "M");
  selectSze.option("pineapple", "L");
  selectSze.option("watermelon", "XL");
  selectSze.changed(szeEvent);

  createP("");
  button1 = createButton("please find my soulmate");
  button1.mousePressed(update);
  button1.id("button");

}

function barEvent() {
  if (selectAnimal.value() == "dog") {
    animalPick = "dog";
  }

  if (selectAnimal.value() == "cat") {
    animalPick = "cat";
  }

  if (selectAnimal.value() == "bird") {
    animalPick = "bird";
  }

  if (selectAnimal.value() == "reptile") {
    animalPick = "reptile";
  }

  if (selectAnimal.value() == "pig") {
    animalPick = "pig";
  }
}

function genderEvent() {
  if (selectGender.value() == "F") {
    genderPick = "F";
  }

  if (selectGender.value() == "M") {
    genderPick = "M";
  }

  if (selectGender.value() == "either") {
    genderPick = "";
  }
}

function ageEvent() {
  if (selectAge.value() == "Senior") {
    agePick = "Senior";
  }

  if (selectAge.value() == "Adult") {
    agePick = "Adult";
  }

  if (selectAge.value() == "Young") {
    agePick = "Young";
  }

  if (selectAge.value() == "Baby") {
    agePick = "Baby";
  }
}

function szeEvent() {
  if (selectSze.value() == "S") {
    szePick = "S"
  }

  if (selectSze.value() == "M") {
    szePick = "M"
  }

  if (selectSze.value() == "L") {
    szePick = "L"
  }

  if (selectSze.value() == "XL") {
    szePick = "XL"
  }
}

function update() {

  selectSze.hide();
  selectAge.hide();
  selectGender.hide();
  selectAnimal.hide();
  inputZip.hide();
  textSze.hide();
  textAge.hide();
  textGender.hide();
  textAnimal.hide();
  textZip.hide();
  button1.hide();
  textIntro.hide();

  var url = 'http://api.petfinder.com/pet.getRandom?&&format=json&output=full&key=63703cf6c3d40b73af4e939adda7da4f'
  var zip = inputZip.value();
  loadJSON(url + '&animal=' + animalPick + '&location=' + zip + '&sex=' + genderPick + '&age=' + agePick + '&size=' + szePick, getPet, 'jsonp');

}

function getPet(data) {
  if (data.petfinder.pet == undefined) {
    var textFailed = createA("http://nicole.pizza/itp/icm/week8-soulmatemachine/", "Sorry, there's no soulmate for you. Try again.");
    textFailed.id("question");
    textFailed.position(400, 200);
  } else {
    var petName = data.petfinder.pet.name.$t;
    var petType = data.petfinder.pet.animal.$t;
    var petDescription = data.petfinder.pet.description.$t;
    var petCity = data.petfinder.pet.contact.city.$t;
    var petState = data.petfinder.pet.contact.state.$t;
    var petPic = data.petfinder.pet.media.photos.photo;
    var petID = data.petfinder.pet.id.$t;



    var textCongrats = createP("congratulations! your soulmate is...");
    textCongrats.id("h1");

    var textPetName = createP(petName);
    textPetName.id("name");

    imagePet = createImg(petPic[3].$t);
    imagePet.id("image");
    createP("");
    var adopt = createA("https://www.petfinder.com/petdetail/" + petID, "click here if ur in love");
    adopt.id("links");
    createP("");
    var restart = createA("http://nicole.pizza/itp/icm/week8-soulmatemachine", " click here if ur not feeling it to start over");
    restart.id("links");

    var textPetType = createP("Type: " + petType);
    textPetType.id("text");
    textPetType.position(600, 150);
    var textLocation = createP("Location: " + petCity + ' , ' + petState);
    textLocation.id("text");
    textLocation.position(600, 170);
    var textPetDescription = createP("Description: " + petDescription);
    textPetDescription.id("text");
    textPetDescription.position(600, 190);

  }

}