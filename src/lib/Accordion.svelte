<script>
import Accordion from './Accordion.svelte';
</script>

<Accordion>
  {#snippet head()}
    <span>This is my header</span>
  {/snippet}
  {#snippet details()}
    <div>
      <p>These are the details.</p>
    </div>
  {/snippet}
</Accordion>

<Accordion open={true}>
  {#snippet head()}
    <span
      >This is my header number two, it's quite long so should span multiple lines (if not: please
      resize the window!)</span
    >
  {/snippet}
  {#snippet details()}
    <div>
      <p>These are the second details.</p>
      <p>This can naturally span multiple lines.</p>
    </div>
  {/snippet}
</Accordion>

<Accordion>
  {#snippet head()}
    <span>This is a header for a table.</span>
  {/snippet}
  {#snippet details()}
    <div>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </tbody>
      </table>
    </div>
  {/snippet}
</Accordion>
