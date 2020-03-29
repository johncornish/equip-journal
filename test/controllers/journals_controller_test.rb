require 'test_helper'

class JournalsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @journal = journals(:one)
  end

  test "should get index" do
    get journals_url
    assert_response :success
  end

  test "should get new" do
    get new_journal_url
    assert_response :success
  end

  test "should create journal" do
    assert_difference('Journal.count') do
      post journals_url, params: { journal: { name: @journal.name } }
    end

    assert_redirected_to journal_url(Journal.last)
  end

  test "should show journal and entries" do
    JournalEntry.create!(
      journal: @journal,
      text: 'test-entry-text',
    )

    expected = to_sequence_regex([
      @journal.name,
      'test-entry-text',
      'edit',
      'delete',
    ])

    get journal_url(@journal)
    assert_response :success
    assert_select 'body', expected
    assert_select 'input[type="submit"][value=?]', 'Create Journal entry'
  end

  test "should break down journal lines by day and collection, with tasks on the current day" do
    t = Time.local(2000, 1, 1, 10, 0, 0)
    Timecop.travel(t)
    JournalEntry.create!(
      journal: @journal,
      text: 'test-entry-text-2',
    )
    Task.create!(
      journal_entry: JournalEntry.create!(
        journal: @journal,
        text: 'test-entry-task-1',
      ),
    )
    t = Time.local(2000, 1, 1, 9, 0, 0)
    Timecop.travel(t)
    JournalEntry.create!(
      journal: @journal,
      text: 'test-entry-text-1',
      collection: 'test-collection-1',
    )
    t = Time.local(2000, 1, 1, 11, 0, 0)
    Timecop.travel(t)
    JournalEntry.create!(
      journal: @journal,
      text: 'test-entry-text-3',
      collection: 'test-collection-2',
    )
    t = Time.local(2000, 1, 12, 10, 0, 0)
    Timecop.travel(t)
    JournalEntry.create!(
      journal: @journal,
      text: 'test-entry-text-4',
    )
    Task.create!(
      journal_entry: JournalEntry.create!(
        journal: @journal,
        text: 'test-entry-task-2',
      ),
    )
    get journal_url(@journal)

    expected = to_sequence_regex([
      '1-12-2000',
      'Tasks',
      'test-entry-task-1',
      'test-entry-task-2',
      'Journal',
      'test-entry-text-4',
      'test-entry-task-2',

      'test-collection-2',
      'test-entry-text-3',
      
      'test-collection-1',
      'test-entry-text-1',

      '1-1-2000',
      'test-entry-text-1',
      'test-entry-text-2',
      'test-entry-task-1',
      'test-entry-text-3',
    ])

    assert_response :success
    assert_select 'body', expected
  end

  test "should show a collection index" do
    JournalEntry.create!(
      journal: @journal,
      text: 'test-entry-text-1',
      collection: 'test-entry-collection-1',
    )
    JournalEntry.create!(
      journal: @journal,
      text: 'test-entry-text-2',
      collection: 'test-entry-collection-2',
    )

    expected = to_sequence_regex([
      'Index',
      'test-entry-collection-1',
      'test-entry-collection-2',
      'test-entry-collection-1',
    ])

    get journal_url(@journal)
    assert_response :success
    assert_select 'body', expected
    assert_select 'input[type="submit"][value=?]', 'Create Journal entry'
  end

  test "should get edit" do
    get edit_journal_url(@journal)
    assert_response :success
  end

  test "should update journal" do
    patch journal_url(@journal), params: { journal: { name: @journal.name } }
    assert_redirected_to journal_url(@journal)
  end

  test "should destroy journal" do
    assert_difference('Journal.count', -1) do
      delete journal_url(@journal)
    end

    assert_redirected_to journals_url
  end
end
