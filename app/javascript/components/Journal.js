import React from "react"
import PropTypes from "prop-types"
class Journal extends React.Component {
  render () {
    const entries = this.props.journalEntries.map((je, i) => (
      <li key={i}>{je.text}</li>
    ))
    return (
      <React.Fragment>
        <p>
          <strong>Name: </strong>
          {this.props.name}
        </p>
        <ul>
          {entries}
        </ul>
      </React.Fragment>

      <%= render 'journal_entry_form', journal_entry: @journal_entry %>

      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Index</h5>
                <ul id="index">
                  <% @collections.each do |c| %>
                  <li>
                    <a href="#journal-entries-<%= c %>"><%= c %></a>
                  </li>
                  <% end %>
                </ul>
              </div>
            </div>
          </div>
          <% @journal.journal_entries_by_collection.reverse_each do |collection_key, jes| %>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title"><%= collection_key %></h5>
                  <% if !jes.first.nil? && jes.first.is_task? %>
                  <% tasks = jes.select { |je| je.is_task? } %>
                  <% jes = jes[tasks.length - 1...] %>
                  <h6>Tasks</h6>
                  <ul id="journal-entries-<%= collection_key %>-tasks">
                    <% tasks.each do |t| %>
                    <%= render(:partial => 'journal_entries/single', :locals => { :journal_entry => t }) %>
                    <% end %>
                  </ul>
                  <h6>Journal</h6>
                  <% end %>
                  <ul id="journal-entries-<%= collection_key %>">
                    <% jes.each do |je| %>
                    <%= render(:partial => 'journal_entries/single', :locals => { :journal_entry => je }) %>
                    <% end %>
                  </ul>
                </div>
              </div>
            </div>
          <% end %>
        </div>
      </div>
    );
  }
}

Journal.propTypes = {
  name: PropTypes.string,
  journalEntries: PropTypes.array
};
export default Journal
