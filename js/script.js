const TimeFrames =
{
    Daily: "Day",
    Weekly: "Week",
    Monthly: "Month"
}

const infoCards = document.querySelectorAll(".info-card");

const dailyButton = document.querySelector("#daily-button");
const weeklyButton = document.querySelector("#weekly-button");
const monthlyButton = document.querySelector("#monthly-button");


dailyButton.addEventListener("click", () =>
{
    loadInfoIntoCards(TimeFrames.Daily);
});

weeklyButton.addEventListener("click", () =>
{
    loadInfoIntoCards(TimeFrames.Weekly);
});

monthlyButton.addEventListener("click", () =>
{
    loadInfoIntoCards(TimeFrames.Monthly);
});

loadInfoIntoCards(TimeFrames.Daily);

function loadInfoIntoCards(timeFramesType)
{
    fetch("../data.json")
    .then(response => response.json())
    .then(data => 
    {
        data.forEach((info, index) => {
            showInfoInCard(info, index, timeFramesType);
        });
    });
}

function showInfoInCard(info, index, timeFramesType)
{
    const infoCard = infoCards[index];

    const title = info.title;
    let currentTimeFrames;
    let previousTimeFrames;

    switch(timeFramesType)
    {
        case TimeFrames.Daily:
            currentTimeFrames = info.timeframes.daily.current;
            previousTimeFrames = info.timeframes.daily.previous;
            break;

        case TimeFrames.Weekly:
            currentTimeFrames = info.timeframes.weekly.current;
            previousTimeFrames = info.timeframes.weekly.previous;
            break;

        case TimeFrames.Monthly:
            currentTimeFrames = info.timeframes.monthly.current;
            previousTimeFrames = info.timeframes.monthly.previous;
            break;
    }
    
    

    infoCard.querySelector(".title").innerHTML = title;
    infoCard.querySelector(".current-time-frames").innerHTML = `${currentTimeFrames}hrs`;
    infoCard.querySelector(".previous-time-frames").innerHTML = `Last ${timeFramesType} - ${previousTimeFrames}hrs`;

}

