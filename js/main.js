const milestoneData = JSON.parse(data).data;

//load course milestone data

function loadMilestones() {
    const milestones = document.querySelector(".milestones");

    milestones.innerHTML = `${milestoneData
        .map(function (milestone) {
            return ` <div class="milestone border-b" id="${milestone._id}">
                    <div class="flex">
                        <div class="checkbox"><input type="checkbox" onclick="markMilestone(this, ${milestone._id
                })" /></div>
                        <div onclick="openmilestone(this, ${milestone._id})">
                            <p>
                                ${milestone.name}
                                <span><i class="fas fa-chevron-down"></i></span>
                            </p>
                        </div>
                    </div>

                    <div class="hidden_pannel ">
                        ${milestone.modules
                    .map(function (module) {
                        return ` <div class="module border-b">
                            <p>${module.name}</p>
                        </div>`;
                    })
                    .join("")}
                    </div>
                </div>`;
        })
        .join("")}`;
}

function openmilestone(milestoneElement, id) {
    const currentPanel = milestoneElement.parentNode.nextElementSibling;
    const shownPanel = document.querySelector(".show");
    const active = document.querySelector(".active");

    //first remove previous active class if any [other than the clicked one]
    if (active && !milestoneElement.classList.contains("active")) {
        active.classList.remove("active");
    }

    //toggle current clicked
    milestoneElement.classList.toggle("active");

    //first hide previous pannel if open[other than the clicked element]
    if (!currentPanel.classList.contains("show") && shownPanel) {
        shownPanel.classList.remove("show");
    }

    currentPanel.classList.toggle("show");
    showMilestone(id);
}

function showMilestone(id) {
    const milestomeImage = document.querySelector(".milestoneImg");
    const name = document.querySelector(".title");
    const details = document.querySelector(".details");

    milestomeImage.style.opacity = "0";
    milestomeImage.src = milestoneData[id].image;
    name.innerText = milestoneData[id].name;
    details.innerText = milestoneData[id].description;
}

//listen for hero image load

const milestomeImage = document.querySelector(".milestoneImg");
milestomeImage.onload = function () {
    this.style.opacity = "1";
};

function markMilestone(checkbox, id) {
    const donelist = document.querySelector(".donelist");
    const milestoneList = document.querySelector(".milestones");
    const item = document.getElementById(id);

    if (checkbox.checked) {
        //mark as done
        milestoneList.removeChild(item);
        donelist.appendChild(item);
    } else {
        //back to main list
        milestoneList.appendChild(item);
        donelist.removeChild(item);
    }
}



loadMilestones();
