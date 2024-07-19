document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('voteButton').addEventListener('click', showSelection);
    document.getElementById('confirmButton').addEventListener('click', confirmVote);
    document.getElementById('viewResultsButton').addEventListener('click', finalizeSelection);
});

const members = ['멤버 1', '멤버 2', '멤버 3', '멤버 4', '멤버 5', '멤버 6'];
let votes = [];
const selections = {};

function showSelection() {
    document.getElementById('voteButton').style.display = 'none';
    document.getElementById('selection').style.display = 'block';
}

function confirmVote() {
    const day = document.getElementById('daySelect').value;
    const time = document.getElementById('timeSelect').value;
    const vote = `${day} ${time}`;

    votes.push(vote);

    if (selections[vote]) {
        selections[vote]++;
    } else {
        selections[vote] = 1;
    }

    document.getElementById('selection').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';

    if (votes.length === members.length) {
        document.getElementById('viewResultsButton').style.display = 'block';
    } else {
        document.getElementById('voteButton').style.display = 'block';
    }
}

function finalizeSelection() {
    document.getElementById('confirmation').style.display = 'none';

    let maxVotes = 0;
    let finalDate = '';
    const resultsList = document.getElementById('voteResults');
    resultsList.innerHTML = '';
    for (const [date, votes] of Object.entries(selections)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${date}: ${votes}표`;
        resultsList.appendChild(listItem);
        if (votes > maxVotes) {
            maxVotes = votes;
            finalDate = date;
        }
    }

    document.getElementById('finalResult').textContent = `최종 결정된 날짜는 ${finalDate}입니다!`;
    document.getElementById('result').style.display = 'block';
}
