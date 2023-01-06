<script lang="ts">
    export let data: any;
    let assignedActivities = data.assignedActivities;
</script>

<svelte:head>
    <title>Assigned Activities</title>
</svelte:head>

<h2>Your Assigned Activities Today</h2>
<a href="assign/0" class="btn btn-primary">Assign New</a>
<table class="table table-hover">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Hours</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Priority</th>
            <th scope="col">Date</th>
            <th scope="col">Max Date</th>
            <th scope="col">Assigned To</th>
            <th scope="col" />
        </tr>
    </thead>
    <tbody>
        {#each assignedActivities as activity}
            <tr>
                <td>{activity.name}</td>
                <td>{activity.hours}</td>
                <td>{activity.difficulty}</td>
                <td>{activity.priority}</td>
                <td>{activity.date}</td>
                <td>{activity.maxDate}</td>
                <td>{activity.assignedTo}</td>
                <td><a href="assign/{activity.id}">Edit</a></td>
            </tr>
        {/each}
    </tbody>
</table>
