<script lang="ts">
    export let data: any;
    let activities = data.activities;
    let assignedActivities = data.assigned;
</script>

<svelte:head>
    <title>Activities</title>
</svelte:head>

<h2>Your Activities Today</h2>
<a href="activity/0" class="btn btn-primary">Insert New</a>
<table class="table table-hover">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Hours</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Date</th>
            <th scope="col">Completed</th>
        </tr>
    </thead>
    <tbody>
        {#each activities as activity}
            <tr>
                <td>{activity.name}</td>
                <td>{activity.hours}</td>
                <td>{activity.difficulty}</td>
                <td>{activity.date}</td>
                <td>{activity.completed ? "Yes" : "No"}</td>
            </tr>
        {/each}
    </tbody>
</table>
<br />
<br />
<h2>Your Assigned Activities</h2>
<table class="table table-hover">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Estimated Hours</th>
            <th scope="col">Priority</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Max Date</th>
            <th scope="col">Completed</th>
            <th scope="col" />
        </tr>
    </thead>
    <tbody>
        {#each assignedActivities as activity}
            <tr>
                <td>{activity.name}</td>
                <td>{activity.estimatedHours}</td>
                <td>{activity.difficulty}</td>
                <td>{activity.priority}</td>
                <td>{activity.date}</td>
                <td>{activity.completed ? "Yes" : "No"}</td>
                <td><a href="activity/{activity.id}">Do</a></td>
            </tr>
        {/each}
    </tbody>
</table>
