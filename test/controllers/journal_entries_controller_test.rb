require 'test_helper'

class JournalEntriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @journal_entry = journal_entries(:one)
    @parent_journal_entry = journal_entries(:parentJournalEntryOne)
  end

  test "should get index" do
    get journal_entries_url
    assert_response :success
  end

  test "should get new" do
    get new_journal_entry_url
    assert_response :success
  end

  test "should create journal_entry" do
    assert_difference('JournalEntry.count') do
      post journal_entries_url, params: {
          journal_entry: {
          journal_id: @journal_entry.journal_id,
          text: @journal_entry.text,
          collection: @journal_entry.collection
        }
      }
    end

    assert_redirected_to journal_entry_url(JournalEntry.last)
  end

  test "should not create tasks if is_task is nil or false" do
    assert_no_difference('Task.count') do
      post journal_entries_url, params: {
          journal_entry: {
            journal_id: @journal_entry.journal_id,
            text: @journal_entry.text,
            collection: @journal_entry.collection,
          }
        }
    end

    assert_no_difference('Task.count') do
      post journal_entries_url, params: {
          journal_entry: {
            journal_id: @journal_entry.journal_id,
            text: @journal_entry.text,
            collection: @journal_entry.collection,
            is_task: false,
          }
        }
    end
  end

  test "should create tasks if journal_entry is created with is_task==true" do
    assert_difference('Task.count') do
      post journal_entries_url, params: {
          journal_entry: {
            journal_id: @journal_entry.journal_id,
            text: @journal_entry.text,
            collection: @journal_entry.collection,
            is_task: true,
          }
        }
    end
  end

  test "should create only one task if journal_entry is updated with is_task==true" do
    assert_difference('Task.count') do
      patch journal_entry_url(@journal_entry), params: {
          journal_entry: {
            is_task: true,
          }
        }

      patch journal_entry_url(@journal_entry), params: {
          journal_entry: {
            is_task: true,
          }
        }
    end
  end

  test "should remove the task if journal_entry is updated with is_task==false" do
    assert_difference('Task.count', -1) do
      patch journal_entry_url(@parent_journal_entry), params: {
          journal_entry: {
            is_task: false,
          }
        }

      patch journal_entry_url(@parent_journal_entry), params: {
          journal_entry: {
            is_task: false,
          }
        }
    end
  end

  test "should create journal_entry via remote form" do
    assert_difference('JournalEntry.count') do
      post journal_entries_url, xhr: true, params: {
          journal_entry: {
          journal_id: @journal_entry.journal_id,
          text: @journal_entry.text,
          collection: @journal_entry.collection
        }
      }
    end

    assert_response :success
    assert_equal "text/javascript", @response.media_type
  end

  test "should show journal_entry" do
    get journal_entry_url(@journal_entry)
    assert_response :success
  end

  test "should get edit" do
    get edit_journal_entry_url(@journal_entry)
    assert_response :success
  end

  test "should update journal_entry" do
    patch journal_entry_url(@journal_entry), params: {
        journal_entry: {
        journal_id: @journal_entry.journal_id,
        text: @journal_entry.text,
        collection: @journal_entry.collection
      }
    }
    assert_redirected_to journal_entry_url(@journal_entry)
  end

  test "should destroy journal_entry" do
    assert_difference('JournalEntry.count', -1) do
      delete journal_entry_url(@journal_entry)
    end

    assert_redirected_to journal_entries_url
  end
end
